import React, { Component } from 'react'
import './Tables.css'
import update from 'immutability-helper';

class Tables extends Component {
    state = {
        url: "",
        shortname: "",
        desc: "",
        rows: [],
        Editurl: "",
        Editshortname: "",
        Editdesc: "",
        snames: [],
        id: "",
        // addshow:true
    }
    //  rows = []
    //  getrows1 = []
    //  getrows1 = JSON.parse(localStorage.getItem("rows"))
    //  localrows= []
    //  shortnames= []
    //  getshortnames = JSON.parse(localStorage.getItem("shortnames"))
     
    //  componentDidMount(){
    //     // console.log("rows",this.rows)
    //     // console.log("getrows",this.getrows1)
        
    //      if (this.getrows1) {
            
    //          for(let i=0;i<this.getrows1.length;i++){
    //             console.log(this.getrows1[i].key)
    //             this.localrows.push(
    //                 <tr key={this.getrows1[i].key} >
    //                 <td className="tcell">
    //                     <a href={this.getrows1[i].props.children[0].props.children.props.href} target="_blank" rel="noopener noreferrer">{this.getrows1[i].props.children[0].props.children.props.children}</a>
    //                 </td>
    //                 <td className="tcell">{this.getrows1[i].props.children[1].props.children}</td>
    //                 <td className="tcell"><button onClick={() => this.onEditClicked(this.getrows1[i].props.children[0].props.children.props.href, this.getrows1[i].props.children[0].props.children.props.children, this.getrows1[i].props.children[1].props.children, this.getrows1[i].key)} className="edit">Edit</button>
    //                     <button onClick={() => this.removeHandler(this.getrows1[i].key)} className="remove">Remove</button>

    //                 </td>

    //             </tr>
    //             )
    //          }
    //         console.log("localrows",this.localrows)
    //          this.setState({rows:this.localrows}) 
    //      }
         
         
    //  } 
    
     
     

    onEditClicked = (url, shortname, desc, id) => {

        this.setState({ Editurl: url, Editshortname: shortname, Editdesc: desc, id: id })
    }

    addHandler = () => {
        
        const id = Math.random()
        const url = this.state.url
        const shortname = this.state.shortname
        const desc = this.state.desc
        const editurl = this.state.Editurl
        const editshortname = this.state.Editshortname
        const editdesc = this.state.Editdesc


        console.log("local shortnames",this.getshortnames)
        // || (this.getshortnames!==null?this.getshortnames.indexOf(this.state.Editshortname || this.state.shortname)!==-1:false)
        if(this.state.shortname==="" || this.state.url==="" || this.state.desc === ""){
            alert("please enter necessary details")
        }
        else{
            if ((this.state.snames.indexOf(this.state.Editshortname || this.state.shortname)!==-1) ){
                alert('shortname already exists')
            } 
            else {
                
                this.setState({ snames: this.state.snames.concat(this.state.shortname) })
                // this.shortnames.push(JSON.stringify(this.state.snames.concat(this.state.shortname)))
                // let abc= []
                // abc = this.shortnames.push(this.state.shortname)
                // console.log(abc.concat(this.state.snames))
                // console.log(this.shortnames)
                // console.log(this.state.snames)
                // localStorage.setItem("shortnames",JSON.stringify(this.getshortnames? this.getshortnames.concat(this.state.shortname):null))
                this.setState({
                    rows: this.state.rows.concat(
                        <tr key={id} >
                        <td className="tcell">
                            <a href={editurl ? editurl : url} target="_blank" rel="noopener noreferrer">{editshortname ? editshortname : shortname}</a>
                        </td>
                        <td className="tcell">{editdesc ? editdesc : desc}</td>
                        <td className="tcell"><button onClick={() => this.onEditClicked(url, shortname, desc, id)} className="edit">Edit</button>
                            <button onClick={() => this.removeHandler(id)} className="remove">Remove</button>
    
                        </td>
    
                    </tr>
                        
                        )
                })
                
                    // this.rows.push(
                    //     <tr key={id} >
                    //     <td className="tcell">
                    //         <a href={editurl ? editurl : url} target="_blank" rel="noopener noreferrer">{editshortname ? editshortname : shortname}</a>
                    //     </td>
                    //     <td className="tcell">{editdesc ? editdesc : desc}</td>
                    //     <td className="tcell"><button onClick={() => this.onEditClicked(url, shortname, desc, id)} className="edit">Edit</button>
                    //         <button onClick={() => this.removeHandler(id)} className="remove">Remove</button>
    
                    //     </td>
    
                    // </tr>
                    // )
                    // console.log("abc",this.rows.concat(this.localrows))
                    // localStorage.setItem("rows",JSON.stringify(this.localrows.concat(this.rows)))
                
                this.setState({ url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "" })
    
    
    
            }
        }

    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    removeHandler = (ids) => {
        // console.log("rows in remove",this.state.rows)
        let ab = this.state.rows.filter(res => Number(res.key) === Number(ids))
        // console.log(ab)
        let abc = ab[0].props.children[0].props.children.props.children
        this.setState({ snames: this.state.snames.filter(res => res !== abc) })
        // localStorage.setItem("shortnames",JSON.stringify(this.state.snames.filter(res => res !== abc)))
        let newrows = this.state.rows.filter(res => Number(res.key) !== Number(ids))
        this.setState({ rows: newrows })
        // localStorage.setItem("rows",JSON.stringify(newrows))
    }
    modifyHandler = (id) => {

        const url = this.state.url
        const shortname = this.state.shortname
        const desc = this.state.desc
        const editurl = this.state.Editurl
        const editshortname = this.state.Editshortname
        const editdesc = this.state.Editdesc

        let keysarr = []
        this.state.rows.map((res) => keysarr.push(Number(res.key)))
        let indx = keysarr.indexOf(id)
        let updat = <tr key={id} className="tcell">
            <td className="tcell">
                <a href={editurl ? editurl : url} target="_blank" rel="noopener noreferrer">{editshortname ? editshortname : shortname}</a>
            </td>
            <td className="tcell">{editdesc ? editdesc : desc}</td>
            <td className="tcell"><button onClick={() => this.onEditClicked(editurl, editshortname, editdesc, id)} className="edit">Edit</button>
                <button onClick={() => this.removeHandler(id)} className="remove">Remove</button>
            </td>
        </tr>
        let updatedrows = update(this.state.rows, { $splice: [[indx, 1, updat]] })
        this.setState({ rows: updatedrows })
        // localStorage.setItem("rows",JSON.stringify(updatedrows))
        this.setState({ url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "", id: "" })
        let editsnames = this.state.rows.filter(res => Number(res.key) === Number(id))
        let editsnames1 = editsnames[0].props.children[0].props.children.props.children
        let editsnames2 = this.state.snames.indexOf(editsnames1)
        let updatesnames = update(this.state.snames, { $splice: [[editsnames2, 1, editshortname]] })
        this.setState({ snames: updatesnames })
    }


    render() {
        // console.log(this.getrows1)
        // console.log(this.state.rows)
        // console.log(this.rows)
        
        // let localrows = JSON.parse(localStorage.getItem("rows"))
        // console.log(localrows)
        // console.log(this.state.rows)
        
        
        return (
            <div className="maindiv">
                <div className="inpsdiv">
                    <h3>List of top Websites</h3>
                    WebsiteUrl:<input type="text" name={this.state.Editurl !== "" ? "Editurl" : "url"} value={this.state.Editurl !== "" ? this.state.Editurl : this.state.url} onChange={this.onChangeHandler} /><br />
                    Shortname:<input type="text" name={this.state.Editshortname !== "" ? "Editshortname" : "shortname"} value={this.state.Editshortname ? this.state.Editshortname : this.state.shortname} onChange={this.onChangeHandler} /><br />
                    description:<input type="text" name={this.state.Editdesc !== "" ? "Editdesc" : "desc"} value={this.state.Editdesc ? this.state.Editdesc : this.state.desc} onChange={this.onChangeHandler} /><br />
                    {this.state.id?null:<button onClick={this.addHandler} className="add">Add</button>}
                    {this.state.id ? <button onClick={() => this.modifyHandler(this.state.id)} className="modify">Modify</button> : null}
                </div>
                <div>
                    <table className="tab">
                        <tbody>
                            <tr>
                                <td style={{ width: "10%", textAlign: "center", padding: "10px" }} className="header">Link</td>
                                <td style={{ width: "80%", textAlign: "center" }} className="header">Description</td>
                                <td style={{ width: "10%", textAlign: "center" }}></td>
                            </tr>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Tables