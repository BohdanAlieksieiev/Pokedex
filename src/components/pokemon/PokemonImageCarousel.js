import React, {Component} from 'react';
import { Carousel, Image  } from 'antd';

export default class PokemonImageCarousel extends Component{

    render(){
        const { spritesArr } = this.props
        return (
            <>
                <div className='margin-block-in-container-in-pokemon'>
                    <Carousel
                        className={'carousel-size'}
                        autoplay
                        dots={false}
                    >
                        {
                            spritesArr.map(( item, index ) => {
                                return (
                                    <div key={index}>
                                        <Image
                                            className={'carousel-item'}
                                            // width={450}
                                            src={item}
                                        />
                                        {/*<img*/}
                                        {/*    className={'carousel-item'}*/}
                                        {/*    src={item}*/}
                                        {/*    alt=""*/}
                                        {/*/>*/}
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </>
        )
    }
}