import * as React from 'react';
import { Component } from 'react';
import Image from './components/image/image';
import Text from './components/text/text';
import Navigation from './components/navigation/navigation';
import Cards from './components/cards/cards';

import './App.css';

class App extends Component<any, any> {
  public render() {
    return <div className="container">
      <div className="menu">
        <Navigation />
      </div>
      <div className="content">
        <a id="image1" />
        <Image imageName="image1.jpg" title="MAIN TITLE" subTitle="Sub Title" />
        <a id="text1" />
        <Text filename="test.json" />
        <a id="image2" />
        <Image imageName="image2.jpg" title="NEXT TITLE" subTitle="Sub Title" />
        <a id="text2" />
        <Cards filename="test.json" title="CARD TITLE" />
      </div>
    </div>
  }
}

export default App;
