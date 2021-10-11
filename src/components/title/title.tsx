import { FC } from 'react';

import ITitleProps from './interface/title-props';

import './title.scss';

const Title: FC<ITitleProps> = (props: ITitleProps) => {
	return <div className="title-container">
		{ (props.title || props.subTitle) && <div className="text-row">
			<header className="text-container">
				{ props.title && <h1 className="primary-text">{ props.title }</h1> }
				{ props.subTitle && <span className="secondary-text">{ props.subTitle }</span> }
			</header>
		</div> }
	</div>
}

export default Title;
