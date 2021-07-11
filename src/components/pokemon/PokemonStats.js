import React, {Component} from 'react';
import { Radar } from "react-chartjs-2"
import Loading from "../UI/Loading";
import {connect} from "react-redux";
import {getPokemonByName} from "../../services/actions/pokemons";


const connectDecorator = connect(
    null,
    { getPokemonByName }
);


// const data = {
//     labels: [
//         'Eating',
//         'Drinking',
//         'Sleeping',
//         'Designing',
//         'Coding',
//         'Cycling',
//         'Running'
//     ],
//     datasets: [{
//         label: 'My Second Dataset',
//         data: [28, 48, 40, 19, 96, 27, 100],
//         fill: true,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgb(54, 162, 235)',
//         pointBackgroundColor: 'rgb(54, 162, 235)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgb(54, 162, 235)'
//     }]
// };

class PokemonStats extends Component{
    state = {
        width: 500,
        height: 500,
        Loading: true,
        data: {
            labels: [
                'Hp',
                'Attack',
                'Defense',
                'Special attack',
                'Special defense',
                'Speed',
            ],
            datasets: [{
                label: 'My Second Dataset',
                data: [28, 48, 40, 19, 96, 27],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        }
    }

    componentDidMount() {
        this.setPokemonFromProps()
    }

    setPokemonFromProps = async () => { ///// Md bug
        const { pokemon } = this.props
        const datasets = {
            label: pokemon.name,
            data: this.getArrStat(pokemon),
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }

        // stats.forEach(( item ) => {
        //     datasets.data.push(item.base_stat)
        // })

        let datasets2 = null
        const favorite = localStorage.getItem('favorite')
        if(favorite && favorite !== pokemon.name){
            const res = await this.props.getPokemonByName(favorite)
            datasets2 = {
                label: res.name,
                data: this.getArrStat(res),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
        }

        if(datasets2) {
            this.setState({
                data: {
                    ...this.state.data,
                    datasets: [datasets, datasets2]
                }
            })
        }else{
            this.setState({
                data: {
                    ...this.state.data,
                    datasets: [datasets]
                }
            })
        }


        this.setState({
            loading: false
        })
    }

    getArrStat = (pokemon) => {
        let arrStat = []
        pokemon.stats.forEach(( item ) => {
            arrStat.push(item.base_stat)
        })
        return arrStat
    }

    render(){
        const { width, height, data, loading } = this.state
        return (
            <>
                {
                    loading && (
                        <Loading/>
                    )
                }
                {
                    !loading && (
                        <div
                            // style={{ width: width, height: height }}
                            className='margin-block-in-container-in-pokemon pokemon-stats-size'
                        >
                            <Radar
                                className={'char-radar-bg'}
                                type={'radar'}
                                height={width}
                                width={height}
                                data={data}
                            />
                        </div>
                    )
                }

            </>
        )
    }
}

const decoratedComponent = connectDecorator(PokemonStats)
export {decoratedComponent as PokemonStats};