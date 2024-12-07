import React, { Component } from 'react'; 
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps={
        country: "in",
        pageSize: 8,
        category: 'general'

    }
    static propsTypes={
        pageSize: PropTypes.number,

        country: PropTypes.string,
        category:PropTypes.string
}
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
           // articles: this.articles,
           articles: [],
            loading: true,
            page:1,
            totalResults:0

        };
        this.loadingBar = React.createRef();

        document.title= `${this.capitalizeFirstLetter(this.props.category)}-InfoSphere`;
    }

   
     async componentDidMount(){ 
        this.props.setProgress(10); // Start progress
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        this.props.setProgress(30); // Midway
        let data = await fetch(url);
        this.props.setProgress(70); // Data fetched
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles,
                        totalResults: parsedData.totalResults,
                        loading:false});
        this.props.setProgress(100); // Completed
               
    }
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(50); // Update progress
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults||0,
            loading:false
            
        })
        this.props.setProgress(100);

    }
     handlePrevClick = async ()=>{
        this.setState({page:this.state.page - 1});
        this.updateNews();
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db623ef18745404d8bd8292f6a77b276&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
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
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db623ef18745404d8bd8292f6a77b276&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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

//   
    fetchMoreData = async () => {
        try {
            this.setState({ page: this.state.page + 1, loading: true });
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
    
            this.setState({
                articles: this.state.articles.concat(parsedData.articles ),
                // articles: parsedData.articles || [], // Ensure articles is always an array
                //totalResults: parsedData.totalResults || 0,
                totalResults: parsedData.totalResults || this.state.totalResults,
                loading: false
           
            });
                //  loading: false
           
        } catch (error) {
            console.error("Error fetching articles:", error);
            this.setState({ loading: false });
        }
    };
    
    render() { 
        return (
            <>
                <h2 className="text-center" style={{margin:'35px, 0px ;'}}>InfoSphere - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading&& <Spinner/>}

                <InfiniteScroll
                    // dataLength={this.state.articles ||0}
                    dataLength={this.state.articles.length}

                    // dataLength={this.state.articles ? this.state.articles.length : 0}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((element) => ( */}

                            {this.state.articles.map((element) => (
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
}

export default News

    {/* <div className="container d-flex justify-content-between my-3">
        <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
        >
            &larr; Previous
        </button>
        <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}>
        
            Next &rarr;
        </button>
    </div> */}
// </div>


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
       