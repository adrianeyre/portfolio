import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './footer.css';

export default class Footer extends Component<{}, {}> {
	private readonly thisYear: number;

	constructor() {
		super({});

		const todaysDate = new Date();
		this.thisYear = todaysDate.getFullYear();
	}

	public render() {
		return <div className="footer-container">
			<footer className="centre-text">
				<span>&#169;{ this.thisYear } Adrian Eyre |</span>
				<span> <a href="https://github.com/adrianeyre/portfolio" target="_blank"><FontAwesomeIcon icon={ faGithub } /> Website Design</a></span>
			</footer>
		</div>
	}
}