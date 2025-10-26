// Simple test version to debug white page
const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lexa - Test Page</h1>
      <p>If you can see this, React is working!</p>
      <p>Environment check:</p>
      <ul>
        <li>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</li>
        <li>VITE_SUPABASE_PUBLISHABLE_KEY: {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'Set' : 'Not set'}</li>
      </ul>
    </div>
  );
};

export default App;
