import styles from "../Footer/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footerArea}>
            <div className="container">
                <div className={`row ${styles.footerRow}`}>
                    <div className={`col-12 col-sm-6 col-lg-4 ${styles.footerCol}`}>
                        <div className={`${styles.singleFooterWidget} section_padding_0_130`}>
                            <div className="footer-logo mb-3"></div>
                            <p>Appland is a creative, lightweight, clean app landing page.</p>
                            <div className={`${styles.copywriteText} mb-5`}>
                                <p className="mb-0">
                                    Made with <i className="lni-heart mr-1"></i> by
                                    <a className="ml-1" href="https://wrapbootstrap.com/user/DesigningWorld">Designing World</a>
                                </p>
                            </div>
                            <div className={styles.footerSocialArea}>
                                <a href="#" className={styles.footerSocialLink} title="Facebook"><i className="fa fa-facebook" /></a>
                                <a href="#" className={styles.footerSocialLink} title="Pinterest"><i className="fa fa-pinterest" /></a>
                                <a href="#" className={styles.footerSocialLink} title="Skype"><i className="fa fa-skype" /></a>
                                <a href="#" className={styles.footerSocialLink} title="Twitter"><i className="fa fa-twitter" /></a>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-sm-6 col-lg ${styles.footerCol}`}>
                        <div className={`${styles.singleFooterWidget} section_padding_0_130`}>
                            <h5 className={styles.widgetTitle}>About</h5>
                            <ul className={styles.listReset}>
                                <li><a href="#" className={styles.footerMenuLink}>About Us</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Corporate Sale</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Terms & Policy</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Community</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`col-12 col-sm-6 col-lg ${styles.footerCol}`}>
                        <div className={`${styles.singleFooterWidget} section_padding_0_130`}>
                            <h5 className={styles.widgetTitle}>Support</h5>
                            <ul className={styles.listReset}>
                                <li><a href="#" className={styles.footerMenuLink}>Help</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Support</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Privacy Policy</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`col-12 col-sm-6 col-lg ${styles.footerCol}`}>
                        <div className={`${styles.singleFooterWidget} section_padding_0_130`}>
                            <h5 className={styles.widgetTitle}>Contact</h5>
                            <ul className={styles.listReset}>
                                <li><a href="#" className={styles.footerMenuLink}>Call Centre</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Email Us</a></li>
                                <li><a href="#" className={styles.footerMenuLink}>Help Center</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
