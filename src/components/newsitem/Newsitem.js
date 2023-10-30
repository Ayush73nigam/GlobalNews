import React, { Component } from 'react'
import './Newsitem.css'

export class Newsitem extends Component {
  render() {
    let {title, description, imgurl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-4'>
        <div className="card">
  <img src={imgurl ? imgurl : "https://www.hindustantimes.com/ht-img/img/2023/10/25/1600x900/55_inch_tv_1698215723145_1698215741013.jpg"} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title"> 
    {title}<h6><span class="badge text bg-primary">New</span></h6>
    <h6>
    <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
  </h6>
    </h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {author} on {date}</small></p>
    <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Continue</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
