import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './footer.css';

const Footer: FC = () => {
	const todaysDate = new Date();
	const thisYear = todaysDate.getFullYear();

	return <div className="footer-container">
		<footer className="centre-text">
			<span>&#169;{ thisYear } Adrian Eyre |</span>
			<span> <a href="https://github.com/adrianeyre/portfolio" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={ faGithub } /> Website Design</a></span>
		</footer>
	</div>
}

export default Footer;
