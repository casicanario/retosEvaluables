const Home = () => {
  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '64px 16px',
      backgroundColor: 'white'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        color: '#3b82f6',
        marginBottom: '32px'
      }}>
        Home
      </h1>
      <div style={{ textAlign: 'center', maxWidth: '672px', padding: '0 24px' }}>
        <p style={{ fontSize: '18px', color: '#374151', marginBottom: '8px' }}>
          "The only way to learn is to live."
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Matt Haig</span> - The Midnight Library
        </p>
      </div>
    </div>
  );
};

export default Home;
