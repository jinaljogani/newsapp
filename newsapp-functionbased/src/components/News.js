import React, { useEffect,useState } from 'react'; 

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {
   const [articles, setArticles] = useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResult] = useState(0)

    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   
   
   const updateNews= async ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(50); 
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }
<<<<<<< HEAD

    useEffect(() => {
        document.title= `${capitalizeFirstLetter(props.category)}-InfoSphere`;

      updateNews();
      
    }, [])
    
   
   
=======
     handlePrevClick = async ()=>{
        this.setState({page:this.state.page - 1});
        this.updateNews();
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);  
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
    }
    
     handleNextClick = async ()=>{

        this.setState({page:this.state.page + 1});
        this.updateNews();
    //     console.log("Next"); 
    //     if ((!this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     }
    //     else{
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({loading:true});
    //         let data = await fetch(url);

    //         let parsedData = await data.json()
    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parsedData.articles,
    //             loading: false
    //         })
    // }
    }
>>>>>>> e7e91c42404ca17dd68e67695734f006ee225efc

//   
   const fetchMoreData = async () => {
     
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page+1)

            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles))
            setTotalResult(parsedData.totalResults || totalResults)
       
       
    };
    
        return (
            <>
                <h2 className="text-center" style={{margin:'35px, 0px' , marginTop:'90px '}}>InfoSphere - Top Headlines on {capitalizeFirstLetter(props.category)}</h2>
                {loading&& <Spinner/>}

                <InfiniteScroll
                    // dataLength={articles ||0}
                    dataLength={articles.length}

                    // dataLength={articles ? articles.length : 0}
                    next={fetchMoreData}
                    hasMore={articles.length!== totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {/* {!loading && articles.map((element) => ( */}

                            {articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title || ""}
                                        description={element.description || ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                        
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    
}
News.defaultProps={
    country: "in",
    pageSize: 8,
    category: 'general'

}
News.propsTypes={
    pageSize: PropTypes.number,

    country: PropTypes.string,
    category:PropTypes.string
}
export default News

   

<<<<<<< HEAD
       
=======

            // <div className="container my-3">
            // <h2 className="text-center">InfoSphere - Top Headlines</h2>
            // <div className="row"> 
            //         <div className="col-md-4">
            //             <NewsItem title="myTitle" description="mydesc" imageUrl="https://cdn.24.co.za/files/Cms/General/d/10743/97d776dc91734e98906c0e1b7f3b1afa.jpg" newsUrl="TODO"/>
            //         </div>
            //         <div className="col-md-4">
            //             <NewsItem title="myTitle" description="mydesc"/>
            //         </div>
            //         <div className="col-md-4">
            //             <NewsItem title="myTitle" description="mydesc"/>

            //     {this.state.articles.map((element)=>{
            //         return <div className="col-md-4" key={element.url}>
            //             <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            //         </div> 
            //     })} 
            //     </div> 
            //     <div className="container d-flex justify-content-between my-3">
            //     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            //     <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            //     </div>
            // </div>
            // </div>
       
>>>>>>> e7e91c42404ca17dd68e67695734f006ee225efc
