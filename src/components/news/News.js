import React, { Component } from 'react'
import Newsitem from '../newsitem/Newsitem'
import Spinner from '../Spinner';
import PropTypes from 'prop-types'
import Earth from '../earth.avif'
import InfiniteScroll from "react-infinite-scroll-component";

import './News.css'
export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 6,
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  }
  capitalize = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
constructor(props){
    super(props);
    console.log("hello i am a constructor");
        this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults: 0
        }
        document.title= `${this.capitalize(this.props.category)} - GlobalNews`;
}


async update() {
  this.props.updateProgress(5);
  const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=57e861509ab74b54b96790a322e5e355&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  this.props.updateProgress(25);
  let parsedData = await data.json();
  this.props.updateProgress(75);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false
  })
  this.props.updateProgress(100);
}
async componentDidMount(){
  this.update();
}


clicknext = async ()=>{
  this.update();
  this.setState({page: this.state.page + 1});
}


clickprevious = async ()=>{
  this.update();
  this.setState({page: this.state.page - 1});
}

fetchMoreData = async () => {
  this.setState({page: this.state.page + 1});
  
  const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=57e861509ab74b54b96790a322e5e355&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();

  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    loading: false
  })
};

  render() {
    return (
      <>
        <div className='heading'><h1 className="d-flex justify-content-center my-4">Gl<img className='image' src={Earth}></img> balNews</h1>  
        </div>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-2">
          { this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem title = {element.title ? element.title: ""} description = {element.description ? element.description.slice(0,90)+"...." : ""} imgurl= {element.urlToImage} newsUrl= {element.url} author= {element.author ? element.author : "Unknown"} date={element.publishedAt} source= {element.source.name}/>
         </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        </>
    )
  }
}

export default News
