import React from 'react';
import HomeNavigation from '../navigation/HomeNavigation';
import Banner from './banner/Banner';
import Section from './section/Section';
import MainMenu from './main-menu/MainMenu';

function Index() {
    return (
        <div>
            {/* <ProductNavigation></ProductNavigation> */}
            <HomeNavigation></HomeNavigation>
            <Banner></Banner>
            <Section></Section>
            <MainMenu></MainMenu>
        </div>
    );
}

export default Index;
