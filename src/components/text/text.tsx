import * as React from 'react';
import { Component } from 'react';

import './text.css';

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

class Text extends Component<ITextProps, ITextState> {
    constructor(props: ITextProps) {
        super(props);
    }

    public async componentDidMount() {
        fetch(`./data/${ this.props.filename }`)
            .then(response => response.json())
            .then(data => this.setState(prev => ({ data })))
    }

    public render() {
        return <div>
                { this.state && this.state.data && this.state.data.map((item: IData, i: number) => <div key="i">
                    { item.title && <h1>{ item.title }</h1> }
                    { item.body && <h4>{ item.body }</h4> }
                </div>) }
            </div>
    }
}

export default Text;