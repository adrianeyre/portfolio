import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FreeFonts from '@fortawesome/free-solid-svg-icons';
import * as BrandFonts from '@fortawesome/free-brands-svg-icons';
import { get } from 'lodash';

import IDataService from '../../services/interface/data-service-interface';
import IModalType from '../../services/interface/modal-type-interface';
import ILinksProps from './interface/links-props';

import styles from '@/styles/links.module.scss';

const Links = (props: ILinksProps) => {
	const fonts = {
		free: FreeFonts,
		brand: BrandFonts,
	}

	const handleClickLink = (link?: string, type?: string) => {
		if (!link || !type) return;

		if (type === 'link') {
			window.open(link, '_blank');
			return;
		}

		if (type === 'anchor') {
			return props.scrollToAnchor(link);
		}

		const data: IDataService = {
			title: 'Contact Me'
		};

		props.showModal(IModalType.email, data);
	}

	return <div className={styles.linksContainer}>
		{ props.data && props.data.map((item: IDataService, linkIndex: number) => <span key={ `link-${ linkIndex }` }>
			{ item && item.image && item.image.link && item.image.type && <a onClick={ () => handleClickLink(item.image?.link, item.image?.type) }>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{ item.image.filename && <img alt={ item.image.filename } src={ item.image.filename } /> }
				{ item.image.font && <FontAwesomeIcon className={styles.icon} icon={ get(fonts, item.image.font) } /> }
			</a> }
		</span>)}
	</div>
}

export default Links;
