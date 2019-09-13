import * as React from 'react';
import { Component } from 'react';

import './carousel.css';

interface ITextProps {
    filename: string;
}

interface IData {
    title?: string;
    body?: string;
}

interface ITextState {
    data: IData[];
}

class Carousel extends Component<ITextProps, ITextState> {
    constructor(props: ITextProps) {
        super(props);
    }

    public async componentDidMount() {
        fetch(this.props.filename)
            .then(response => response.json())
            .then(data => this.setState(prev => ({ data })))
    }

    public render() {
        return <div className="carousel-container">
                <div className="carousel-left-arrow" onClick={ this.moveCarouselLeft }>LEFT</div>
                <div className="carousel-container-items">
                    { this.state && this.state.data && this.state.data.map((item: IData, i: number) => <div className="carousel-item" key="i">
                        <h3>{ item.title }</h3>
                        <div>{ item.body }</div>
                    </div>) }
                </div>
                <div className="carousel-right-arrow" onClick={ this.moveCarouselRight }>RIGHT</div>
            </div>
    }

    private moveCarouselRight = (): void => {
        const data = [ ...this.state.data ];
        data.push(data.shift() as IData);
        this.setState(prev => ({ data }));
    }

    private moveCarouselLeft = (): void => {
        const data = [ ...this.state.data ];
        const last = data.pop() as IData;
        this.setState(prev => ({ data: [last, ...data] }));
    }
}

export default Carousel;