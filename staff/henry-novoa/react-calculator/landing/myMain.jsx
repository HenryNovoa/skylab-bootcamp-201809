const root = document.getElementById('root')

class Button extends React.Component{
    state = { status : 'Off' }


}

class multiply extends React.Component{
    
    whenClicked = () => {

    }
}
class add extends React.Component {

}

class subtract extends React.Component{

}

class divide extends React.Component{


}

class App extends React.Component{
    state = { add: false ,
              subtract : false ,
              multiply : false ,
              divide : false   }
    
    chooseOperation = (choice) => {
        const operation = choice
        this.setState({ operation }) 

    }            
    render(){
        return <input>
                <Button whenClicked={/*switch add to true*/} />
                <Button whenClicked={/*switch subtract to true*/} />
                <Button whenClicked={/*switch multiply to true*/} />
                <Button whenClicked={/*switch divide to true*/} />
            </input>
    }

}

ReactDOM.render(<App />, root)  