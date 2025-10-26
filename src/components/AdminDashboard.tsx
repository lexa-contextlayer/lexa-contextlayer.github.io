import { useEffect, useState } from "react";
import { getVisitorStats, getWaitlistCount, getWaitlistEntries } from "@/utils/supabaseQueries";

interface VisitorStats {
  count: number;
  last_visited: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get visitor stats
        const stats = await getVisitorStats();
        setVisitorStats(stats);

        // Get waitlist count
        const count = await getWaitlistCount();
        setWaitlistCount(count || 0);

        // Get waitlist entries
        const entries = await getWaitlistEntries();
        setWaitlistEntries(entries || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lexa Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Visitor Stats</h2>
          <p className="text-3xl font-bold text-blue-600">{visitorStats?.count || 0}</p>
          <p className="text-sm text-gray-600">
            Last visit: {visitorStats?.last_visited ? new Date(visitorStats.last_visited).toLocaleString() : 'Never'}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Waitlist Signups</h2>
          <p className="text-3xl font-bold text-green-600">{waitlistCount}</p>
          <p className="text-sm text-gray-600">Total signups</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Waitlist Entries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {waitlistEntries.slice(0, 10).map((entry) => (
                <tr key={entry.id} className="border-b">
                  <td className="py-2">{entry.email}</td>
                  <td className="py-2">{new Date(entry.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;