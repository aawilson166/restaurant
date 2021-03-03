class App extends React.Component {

    state = {
        name: '',
        price: '',
        description: '',
        image: '',
        menu: [],
      }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        })
      }
    
      //handler for when we create a new item, it stops the page from refreshing on submit then posts submitted change to /menu and then calls the getMenuItem function to re render the updated menu onto the page
      handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/menu', this.state).then(response => {
          this.getMenu()
        })
      }
    
      deleteMenuItem = (event) => {
        axios.delete('/menu/' + event.target.value).then(response => {
          this.getMenu()
        })
      }
    
      updateMenuItem = (event) => {
        event.preventDefault()
        //reset clears out the input box after a user is updated
        event.target.reset()
        const id = event.target.id
        axios.put('/menu/' + id, this.state).then(response => {
          this.getMenu()
        })
      }
    
      //this will not work if the proxy is not added in the package.json
      //need to use this. because we are calling functions that are within the main class of App
      //axios request function(pulling menu from api) this can usually go into componentDidMount but we are going to call getMenuItem more than once
      //on the set state we are also resetting the state of name and price to an empty array which means every time we call getMenuItem the value of name and price to back to empty
      getMenu = () => {
        axios
          .get('/menu')
          .then(
            (response) =>
              this.setState({ menu: response.data, name: '', price: '', description: '', image: ''}),
            (err) => console.log(err)
          )
          //just a new way of error handling
          .catch((error) => console.error(error))
      }
    
    
      //this runs on page load(makes getMenu run on page load)
      componentDidMount = () => {
        this.getMenu()
      }

    render = () => {
      return (
          <div className="main-container">
            <div>
                <h2>Create Menu Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        />
                    <br />
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        onChange={this.handleChange}
                        value={this.state.price}
                        />
                    <br />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        />
                    <br />
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        onChange={this.handleChange}
                        value={this.state.image}
                        />
                    <br />
                    <input type="submit" value="Create Item" />
                </form>
            </div>
            <div className='menu-item-container'>
                {this.state.menu.map(menuItem => {
                    return (
                        <div className="menu-item-card" key={menuItem._id}>
                            {menuItem.name}<br/>
                            {menuItem.price}
                        </div>
                    )
                })}
            </div>
    </div>
      )
    }
  }
  
  ReactDOM.render(<App></App>, document.querySelector('main'))