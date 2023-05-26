import { Component } from 'react';

import { GetGenresType, GetMovieType } from '../utils/movieType';
import { Layout, Section } from '../components/Layout';
import Spinner from '../components/Loading';
import { withRouter } from '../withRouter';
import { Card } from '../components/Card';
import api from '../utils/api';

interface DetailProps {
  id: number;
  title: string;
  runtime: string;
  genres: Array<string>;
  original_language: string;
  poster_path: string;
  status: string;
  overview: string;
  location: any;
  navigate: any;
  datasSimilar: Array<GetMovieType>;
  isLoading: boolean;
}

export class Detail extends Component<DetailProps> {
  state = {
    id: 0,
    title: '',
    runtime: '',
    genres: [],
    original_language: '',
    poster_path: '',
    status: '',
    overview: '',
    datasSimilar: [],
    isLoading: false,
  };

  async fetchDetail(code: string) {
    await api
      .getAll(code)
      .then((response) => {
        this.setState({ isLoading: true });
        const { data } = response;
        this.setState({
          id: data.id,
          title: data.title,
          runtime: data.runtime,
          genres: data.genres,
          original_language: data.original_language,
          poster_path: data.poster_path,
          status: data.status,
          overview: data.overview,
        });
      })
      .catch((error) => {
        console.log('error : ', error.message);
      });
  }
  async fetchSimilar(code: string) {
    await api
      .getAll(code)
      .then((response) => {
        this.setState({ isLoading: true });
        this.setState({ datasSimilar: response.data.results });
      })
      .catch((error) => {
        console.log('error : ', error.message);
      });
  }

  dedicatedMount() {
    const { location } = this.props;
    const id = location?.state?.movie_id;
    this.fetchDetail(id);
    this.fetchSimilar(`${id}/similar`);
  }

  componentDidUpdate() {
    this.dedicatedMount();
  }

  componentDidMount() {
    this.dedicatedMount();
  }

  handleNav(movie_id?: number) {
    const navigate = this.props.navigate;
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  }

  render() {
    const {
      title,
      runtime,
      genres,
      original_language,
      poster_path,
      overview,
      datasSimilar,
      isLoading,
      status,
    } = this.state;

    return (
      <Layout>
        <Section
          addClass="bg-base-100 px-16 lg:px-24 py-6 pt-16 "
          id="now-playing-section"
        >
          <div className="w-full min-h-screen flex flex-col items-center">
            <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
              {title}
            </p>
            <div className="flex gap-4 justify-center">
              <figure className="">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="w-96 rounded-2xl "
                />
              </figure>
              <div className="flex flex-col w-2/5 justify-between">
                <div className="">
                  <p className="font-semibold tracking-wide">
                    Runtime:{' '}
                    <span className="tracking-normal font-normal">
                      {runtime} minutes
                    </span>
                  </p>
                  <p className="font-semibold tracking-wide">
                    Genre:{' '}
                    <span className="tracking-normal font-normal">
                      {genres.map((item: GetGenresType) => {
                        return (
                          <>
                            {item.name}
                            {', '}
                          </>
                        );
                      })}
                    </span>
                  </p>
                  <p className="font-semibold tracking-wide">
                    Language:{' '}
                    <span className="tracking-normal font-normal">
                      {original_language}
                    </span>
                  </p>
                  <p className="font-semibold tracking-wide">
                    Status:{' '}
                    <span className="tracking-normal font-normal">
                      {status}
                    </span>
                  </p>
                  <p className="font-semibold tracking-wide">
                    Description:{' '}
                    <span className="tracking-normal font-normal">
                      {overview}
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <div className="flex gap-3">
                    <button
                      id="nav-favorite"
                      className="btn btn-primary "
                    >
                      Add to favorite
                    </button>
                    <button
                      id="nav-watch"
                      className="btn btn-outline btn-primary"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section
          addClass="bg-base-200 px-16 lg:px-24 py-16 !min-h-full"
          id="upcoming-movie-section"
        >
          <div className="w-full flex flex-col  items-center gap-5">
            <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
              Similiar Movie
            </p>
            {datasSimilar && isLoading === true ? (
              <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
                {datasSimilar.slice(0, 4).map((item: GetMovieType) => {
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
          </div>
        </Section>
      </Layout>
    );
  }
}

export default withRouter(Detail);
