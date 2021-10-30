const Footer = () => {
	const today = new Date();

	return (
		<footer className="footer">
			<p>MetadataCatalog &copy; {today.getFullYear()}</p>
		</footer>
	);
};

export default Footer;
