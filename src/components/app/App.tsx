import { useState, useEffect } from 'react';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import DataService from '../../services/data-service'
import CookieParser from '../../services/cookie-parser';
import ICookieParser from '../../services/interface/cookie-interface';
import IDataService from '../../services/interface/data-service-interface';
import IModalType from '../../services/interface/modal-type-interface';
import Image from '../image/image';
import Text from '../text/text';
import Navigation from '../navigation/navigation';
import Carousel from '../carousel/carousel';
import SideBar from '../side-bar/side-bar';
import Bottom from '../bottom/bottom';
import Links from '../links/links';
import Modal from '../modal/modal';
import Message from '../message/message';
import Title from '../title/title';
import ImageBlock from '../image-block/image-block';
import Footer from '../footer/footer';
import ImageList from '../image-list/image-list';

import styles from '@/styles/app.module.scss'

declare global {
	// tslint:disable-next-line
	interface Document {
		documentMode?: any;
	}
}

const App = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<any>();
	const [sidebarStyle, setSidebarStyle] = useState<any>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalData, setModalData] = useState<IDataService>();
	const [modalType, setModalType] = useState<IModalType>();
	const [height, setHeight] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [message, setMessage] = useState<any>();
	const [type, setType] = useState<any>();

	const dataService = new DataService();
	const cookieParser = new CookieParser();
	cookieParser.removeCookies();

	const dataFiles = [
		'menu', 'about', 'links', 'skills', 'projects', 'education', 'experience', 'codewars',
		'interests', 'interestsImages', 'languageImages', 'frameworksImages'
	];

	async function callData() {
		const data: any = {};

		for(const filename of dataFiles) {
			data[filename] = await await dataService.getData(`${ filename }.json`) as IDataService[];
		}

		setData(data);
		setLoading(false);
	};

	useEffect(() => {
		callData();
		
		const updatedSidebarStyle = {
			position: /*@cc_on!@*/false || !!window.document.documentMode ? 'relative' : 'sticky',
		}

		setSidebarStyle(updatedSidebarStyle);

		window.addEventListener('scroll', listenToScroll);
		window.addEventListener('resize', listenToResize);

		const cookieData: ICookieParser = cookieParser.getCookies();
		setMessage(cookieData.message)
		setType(cookieData.type);

		return () => {
			window.removeEventListener('scroll', listenToScroll);
			window.removeEventListener('resize', listenToResize);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openModal = (modalType: IModalType, modalData?: IDataService, ) => {
		setModalType(modalType);
		setModalData(modalData);
		setShowModal(true);
	}

	const closeModal = () => setShowModal(false);

	const listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		setHeight(winScroll / height)
	}

	const listenToResize = () => setWidth(window.innerWidth);

	const scrollToTop = () => scroll.scrollToTop();

	const scrollToAnchor = (anchor: string) => scroller.scrollTo(anchor, {
		duration: 800,
		delay: 0,
		smooth: 'easeInOutQuart',
		offset: 0
	});

	if (loading) return <div className={styles.loadingContainer}>
		<div className='loadingContainer'>
			<div className={styles.loadingBox}>
				<div className={styles.loadingText}>Loading <FontAwesomeIcon icon={ faSpinner } spin={ true } /></div>
			</div>
		</div>
	</div>

	return <div>
		{ showModal && <div className={styles.modal}>
			<Modal data={ modalData } modalType={ modalType } closeModal={ closeModal }/>
		</div> }

		<div className="container">
			<div className={styles.container}>
				<div className={styles.menu}>
					<Navigation
						data={ data.menu }
						linksData={ data.links }
						scrollToAnchor={ scrollToAnchor }
						showModal={ openModal }
					/>
				</div>

				<div className={styles.sidebar} style={ sidebarStyle }>
					<SideBar
						data={ data.menu }
						linksData={ data.links }
						scrollToAnchor={ scrollToAnchor }
						showModal={ openModal }
					/>
				</div>

				<div className={styles.main}>
					<Message
						message={ message }
						type={ type }
					/>
					<div>
						<Element className={styles.block} name="about">
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<Image imageName="image1.jpg" title="ADRIAN EYRE" subTitle="Software Developer" />
							<Text data={ data.about }/>
							<Links data={ data.links } showModal={ openModal } scrollToAnchor={ scrollToAnchor } />
						</Element>
					</div>
					<Element className={styles.block} name="skills">
						<Title title="SKILLS" />
						<Text data={ data.skills } />
						<ImageList title="Languages" data={ data.languageImages } />
						<ImageList title="Frameworks" data={ data.frameworksImages } />
					</Element>
					<Element className={styles.block} name="projects">
						<Title title="PROJECTS" />
						<Carousel data={ data.projects } showModal={ openModal } screenWidth={ width } />
					</Element>
					<Element className={styles.block} name="education">
						<Title title="EDUCATION" />
						<Text data={ data.education } />
					</Element>
					<Element className={styles.block} name="experience">
						<Title title="EXPERIENCE" />
						<Text data={ data.experience } />
					</Element>
					<Element className={styles.block} name="codewars">
						<Title title="AUTHORED CODEWARS KATAS" />
						<Carousel data={ data.codewars } showModal={ openModal } screenWidth={ width } />
					</Element>
					<Element className={styles.block} name="interests">
						<Title title="INTERESTS" />
						<Text data={ data.interests } />
						<ImageBlock data={ data.interestsImages } screenWidth={ width } />
					</Element>
				</div>

				{ height > 0.01 && <div className={styles.bottom}>
					<Bottom scrollToTop={ scrollToTop }/>
				</div> }
			</div>
		</div>
		<Footer />
	</div>
}

export default App;
