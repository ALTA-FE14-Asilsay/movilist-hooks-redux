import { Component } from 'react';

import { Layout, Section } from '../components/Layout';
import { Card, HeroesCard } from '../components/Card';
import { GetMovieType } from '../utils/movieType';
import Spinner from '../components/Loading';
import { withRouter } from '../withRouter';
import api from '../utils/api';

interface DatasState {
  handleTime?: string;
  isLoading: boolean;
  datasNowPlay: Array<GetMovieType>;
  datasUpc: Array<GetMovieType>;
  datasTopRate: GetMovieType;
  navigate: any;
}

class Home extends Component<DatasState> {
  state = {
    datasNowPlay: [],
    datasUpc: [],
    datasTopRate: {
      title: '',
      overview: '',
      poster_path: '',
      id: 0,
    },
    handleTime: '',
    isLoading: false,
  };

  async fetchNowPlay(code: string) {
    await api
      .getAll(code)
      .then((response) => {
        this.setState({ isLoading: true });
        this.setState({ datasNowPlay: response.data.results });
      })
      .catch((error) => {
        console.log('error : ', error.message);
      });
  }
  async fetchUpcoming(code: string) {
    await api
      .getAll(code)
      .then((response) => {
        this.setState({ isLoading: true });
        this.setState({ datasUpc: response.data.results });
      })
      .catch((error) => {
        console.log('error : ', error.message);
      });
  }
  async fetchRandomHero(code: string) {
    await api
      .getAll(code)
      .then((response) => {
        this.setState({ isLoading: true });
        this.setState({
          datasTopRate:
            response.data.results[
              Math.floor(Math.random() * response.data.results.length)
            ],
        });
      })
      .catch((error) => {
        console.log('error : ', error.message);
      });
  }

  handleNav(movie_id?: number) {
    const navigate = this.props.navigate;
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  }

  timeGreeting() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      this.setState({ handleTime: 'good Morning' });
    } else if (currentHour >= 12 && currentHour < 17) {
      this.setState({ handleTime: 'good Aternoon' });
    } else if (currentHour >= 17 && currentHour < 21) {
      this.setState({ handleTime: 'good Evening' });
    } else {
      this.setState({ handleTime: 'good Night' });
    }
  }

  dedicatedMount() {
    this.fetchNowPlay('now_playing');
    this.fetchUpcoming('upcoming');
    this.fetchRandomHero('top_rated');
    this.timeGreeting();
  }

  componentDidMount() {
    this.dedicatedMount();
  }

  render() {
    const { datasNowPlay, datasUpc, datasTopRate, isLoading, handleTime } =
      this.state;

    return (
      <Layout>
        <Section
          addClass="hero bg-base-100 -mt-0 md:-mt-12 xl:-mt-16 px-16 lg:px-24"
          id="greeting-section"
        >
          <div className="hero-content flex-col md:flex-row">
            {/* {
              <HeroesCard
                id={`movie-${datasTopRate.title}`}
                title={datasTopRate.title}
                description={datasTopRate.overview}
                image={datasTopRate.poster_path}
                 onClick={() => this.handleNav(datasTopRate.id)}
              />
            } */}
            <img
              src="http://placekitten.com/900/900"
              className="max-w-sm lg:max-w-md xl:max-w-lg rounded-lg shadow-2xl"
            />
            <div className="">
              <h1 className="text-5xl font-bold">Welcome!</h1>
              <p className="py-6">
                Hello, {handleTime} this is a web for learning and this section
                is greeting, yey!
              </p>
              <button
                onClick={() => this.handleNav(datasTopRate.id)}
                className="btn btn-primary"
              >
                Get Random Top
              </button>
            </div>
          </div>
        </Section>
        <Section
          addClass="bg-base-300 px-16 lg:px-24 py-16 !min-h-full"
          id="upcoming-movie-section"
        >
          <div className="w-full flex flex-col  items-center gap-5">
            <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
              Upcoming Movie
            </p>
            {datasUpc && isLoading === true ? (
              <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
                {datasUpc.slice(0, 4).map((item: GetMovieType) => {
                  return (
                    <Card
                      key={item.id}
                      id={`movie-${item.title}`}
                      title={item.title}
                      description={item.overview}
                      image={item.poster_path}
                      onClick={() => this.handleNav(item.id)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="w-full bg-slate-400 h-[450px] flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <button
              id="nav-showmore"
              className="btn btn-primary btn-wide"
            >
              More
            </button>
          </div>
        </Section>
        <Section
          addClass="bg-base-100 px-16 lg:px-24 py-16 pt-16 "
          id="now-playing-section"
        >
          <div className="w-full min-h-screen flex flex-col items-center gap-5">
            <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
              Now Playing Movie
            </p>
            {datasNowPlay && isLoading === true ? (
              <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
                {datasNowPlay.map((item: GetMovieType) => {
                  return (
                    <Card
                      key={item.id}
                      id={`movie-${item.title}`}
                      title={item.title}
                      description={item.overview}
                      image={item.poster_path}
                      onClick={() => this.handleNav(item.id)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="w-full bg-slate-400 h-[450px] flex items-center justify-center">
                <Spinner />
              </div>
            )}

            <button
              id="nav-showmore"
              className="btn btn-primary btn-wide"
            >
              Show More
            </button>
          </div>
        </Section>
      </Layout>
    );
  }
}

export default withRouter(Home);
