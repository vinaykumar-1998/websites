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
    }
    rows = []
    getrows1 = []
    getrows1 = JSON.parse(localStorage.getItem("rows"))
    localrows = []
    shortnames = []
    getshortnames = []
    getshortnames = JSON.parse(localStorage.getItem("shortnames"))

    componentDidMount() {


        if (this.getrows1) {

            for (let i = 0; i < this.getrows1.length; i++) {

                this.localrows.push(
                    <tr key={this.getrows1[i].key} >
                        <td className="tcell">
                            <a href={this.getrows1[i].props.children[0].props.children.props.href} target="_blank" rel="noopener noreferrer">{this.getrows1[i].props.children[0].props.children.props.children}</a>
                        </td>
                        <td className="tcell">{this.getrows1[i].props.children[1].props.children}</td>
                        <td className="tcell"><button onClick={() => this.onEditClicked(this.getrows1[i].props.children[0].props.children.props.href, this.getrows1[i].props.children[0].props.children.props.children, this.getrows1[i].props.children[1].props.children, this.getrows1[i].key)} className="edit">Edit</button>
                            <button onClick={() => this.removeHandler(this.getrows1[i].key)} className="remove">Remove</button>

                        </td>

                    </tr>
                )
            }

            this.setState({ rows: this.localrows })
            this.setState({ snames: this.getshortnames })
        }


    }

    onEditClicked = (url, shortname, desc, id) => {
        this.setState({ Editurl: url, Editshortname: shortname, Editdesc: desc, id: id })
    
            window.scrollTo(0, 0)
       
    }

    cancelHandler = () => {
        this.setState({ id: "", url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "" })
    }
    addHandler = () => {

        const id = Math.random()
        const url = this.state.url
        const shortname = this.state.shortname
        const desc = this.state.desc
        const editurl = this.state.Editurl
        const editshortname = this.state.Editshortname
        const editdesc = this.state.Editdesc

        if (this.state.shortname === "" || this.state.url === "" || this.state.desc === "") {
            alert("please enter necessary details")
        }
        else {
            if ((this.state.snames.indexOf(this.state.Editshortname || this.state.shortname) !== -1) || (this.getshortnames !== null ? this.getshortnames.indexOf(this.state.Editshortname || this.state.shortname) !== -1 : false)) {
                alert('shortname already exists')
            }
            else {

                this.setState({ snames: this.state.snames.concat(this.state.shortname) })
                this.shortnames.push(this.state.shortname)

                localStorage.setItem("shortnames", JSON.stringify(this.getshortnames ? this.getshortnames.concat(this.shortnames) : this.shortnames))

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

                this.rows.push(
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
                localStorage.setItem("rows", JSON.stringify(this.localrows.concat(this.rows)))
                this.setState({ url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "" })
            }
        }

    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    removeHandler = (ids) => {

        let ab = this.state.rows.filter(res => Number(res.key) === Number(ids))
        this.rows = this.rows.filter(res => Number(res.key) !== Number(ids))
        if (this.localrows) {
            this.localrows = this.localrows.filter(res => Number(res.key) !== Number(ids))
        }

        let abc = ab[0].props.children[0].props.children.props.children
        this.shortnames = this.shortnames.filter(res => res !== abc)
        if (this.getshortnames) {
            this.getshortnames = this.getshortnames.filter(res => res !== abc)
        }
        this.shortnames = this.shortnames.filter(res => res !== abc)
        this.setState({ snames: this.state.snames.filter(res => res !== abc) })
        localStorage.setItem("shortnames", JSON.stringify(this.state.snames.filter(res => res !== abc)))
        let newrows = this.state.rows.filter(res => Number(res.key) !== Number(ids))
        this.setState({ rows: newrows })
        this.setState({ id: "", url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "" })
        localStorage.setItem("rows", JSON.stringify(newrows))
        if (newrows.length === 0) {
            localStorage.clear()
        }
    }
    modifyHandler = (id) => {

        const url = this.state.url
        const shortname = this.state.shortname
        const desc = this.state.desc
        const editurl = this.state.Editurl
        const editshortname = this.state.Editshortname
        const editdesc = this.state.Editdesc
        const editedshortname = editshortname ? editshortname : shortname


        let keysarr = []

        this.state.rows.map((res) => keysarr.push(Number(res.key)))
        let indx = keysarr.indexOf(Number(id))

        let updat = <tr key={Number(id)} className="tcell">
            <td className="tcell">
                <a href={editurl ? editurl : url} target="_blank" rel="noopener noreferrer">{editshortname ? editshortname : shortname}</a>
            </td>
            <td className="tcell">{editdesc ? editdesc : desc}</td>
            <td className="tcell"><button onClick={() => this.onEditClicked(editurl, editedshortname, editdesc, id)} className="edit">Edit</button>
                <button onClick={() => this.removeHandler(id)} className="remove">Remove</button>
            </td>
        </tr>




        let editsnames = this.state.rows.filter(res => Number(res.key) === Number(id))
        let editsnames1 = editsnames[0].props.children[0].props.children.props.children
        let editsnames2 = this.state.snames.indexOf(editsnames1)
        const editnames = editshortname ? editshortname : shortname

        const check = shortname ? this.state.snames.indexOf(shortname) === -1 : false


        if ((editshortname !== "" && this.state.snames.indexOf(editnames) === -1) || check) {
            let updatedrows = update(this.state.rows, { $splice: [[indx, 1, updat]] })
            this.setState({ rows: updatedrows })
            localStorage.setItem("rows", JSON.stringify(updatedrows))
            let updatesnames = update(this.state.snames, { $splice: [[editsnames2, 1, editnames]] })
            this.setState({ snames: updatesnames })
            this.shortnames = updatesnames
            localStorage.setItem("shortnames", JSON.stringify(updatesnames))
            this.setState({ url: "", shortname: "", desc: "", Editurl: "", Editdesc: "", Editshortname: "", id: "" })
        }
        else {
            alert('shortname already exists')
        }
    }


    render() {

        return (
            <div className="maindiv">
                <div className="inpsdiv">
                    <h3>List of top Websites</h3>
                    WebsiteUrl:<input type="text" name={this.state.Editurl !== "" ? "Editurl" : "url"} value={this.state.Editurl !== "" ? this.state.Editurl : this.state.url} onChange={this.onChangeHandler} /><br />
                    Shortname:<input type="text" name={this.state.Editshortname !== "" ? "Editshortname" : "shortname"} value={this.state.Editshortname ? this.state.Editshortname : this.state.shortname} onChange={this.onChangeHandler} /><br />
                    description:<input type="text" name={this.state.Editdesc !== "" ? "Editdesc" : "desc"} value={this.state.Editdesc ? this.state.Editdesc : this.state.desc} onChange={this.onChangeHandler} /><br />
                    {this.state.id ? null : <button onClick={this.addHandler} className="add">Add</button>}
                    {this.state.id ? <button onClick={() => this.modifyHandler(this.state.id)} className="modify">Modify</button> : null}
                    {this.state.id ? <button onClick={() => this.cancelHandler()} className="cancel">Cancel</button> : null}
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