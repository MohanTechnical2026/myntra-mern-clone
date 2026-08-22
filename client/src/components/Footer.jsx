// Footer - shown on every page with useful links and copyright info.

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-columns">
                <div className="footer-column">
                    <h4>ONLINE SHOPPING</h4>
                    <p>Men</p>
                    <p>Women</p>
                    <p>Kids</p>
                    <p>Home &amp; Living</p>
                    <p>Beauty</p>
                </div>

                <div className="footer-column">
                    <h4>CUSTOMER POLICIES</h4>
                    <p>Contact Us</p>
                    <p>FAQ</p>
                    <p>Track Orders</p>
                    <p>Shipping</p>
                    <p>Returns</p>
                </div>

                <div className="footer-column">
                    <h4>USEFUL LINKS</h4>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>StyleBazaar Insider</p>
                    <p>Cash on Delivery</p>
                </div>

                <div className="footer-column">
                    <h4>CONTACT US</h4>
                    <p>support@stylebazaar.example</p>
                    <p>1800-000-0000</p>
                    <div className="social-placeholders">
                        <span>FB</span>
                        <span>IG</span>
                        <span>TW</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    This is an educational MERN Stack e-commerce project inspired by modern
                    fashion e-commerce websites. It is not affiliated with or endorsed by Myntra.
                </p>
                <p>&copy; {new Date().getFullYear()} StyleBazaar. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
