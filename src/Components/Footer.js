const Footer = () => {
    const today = new Date();
   
    return (
      <footer className="footer">
        <p>dashboard-instances &copy; {today.getFullYear()}</p>
      </footer>
    );
  };
  
  export default Footer