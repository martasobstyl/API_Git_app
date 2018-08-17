import React, {Component} from 'react';
import axios from 'axios';

/*const Home = () => {
    return (
        <div className="container">
            <h1>WELCOME</h1>
        </div>
    );
};

export default Home;*/

//solution nr 2

/*export default class Home extends Component {

    componentDidMount() {
        const url = '/home';
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    }

    render() {
        return (
            <div>
                AUTH SUCCESS!
            </div>
        );
    }
}*/

//solution nr3
export default class Home extends Component {
    constructor () {
        super();
        this.state = {
            name: '',
            login: ''
        };
    }

    componentDidMount() {
        //axios.get('https://api.github.com/users/martasobstyl')
        //    .then(response => this.setState({username: response.data.name}))
        const query = window.location.search.substring(1);
        const token = query.split('access_token=')[1];

        axios.get('//api.github.com/user',
            {
                headers: {
                    // Include the token in the Authorization header
                    Authorization: 'token ' + token
                }
            })
            //.then(res => res.json())
            .then(response => this.setState({
                login: response.data.login,
                name: response.data.name
            }))
    }

    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render () {
        const user = this.state.login;
        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${user}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${user}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${user}/following`
            }
        ];

        return (
            <div className='button__container'>
                <p>Hello {this.state.name}</p>
                <div className="user-page">
                    <div className="user-info">
                        <Link className="user-info__text" to={`/user/${user.login}`}>
                            <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
                            <h2 className="user-info__title">{user.login} ({user.name})</h2>
                            <p className="user-info__bio">{user.bio}</p>
                        </Link>

                        <ul className="user-info__stats">
                            {stats.map(this.renderStat)}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
