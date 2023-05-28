import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';
import { Card, HeroesCard } from '../components/Card';
import { GetMovieType } from '../utils/movieType';
import Spinner from '../components/Loading';
import api from '../utils/api';
import swal from '../utils/swal';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [handleTime, setHandleTime] = useState<string>('');
  const [datasNowPlay, setDatasNowPlay] = useState<GetMovieType[]>([]);
  const [datasUpc, setDatasUpc] = useState<GetMovieType[]>([]);
  const [datasTopRate, setDatasTopRate] = useState<GetMovieType>({
    title: '',
    overview: '',
    poster_path: '',
    id: 0,
  });

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const fetchNowPlay = async (code: string) => {
    setIsLoading(true);
    await api
      .getAll(code)
      .then((response) => {
        const { results } = response.data;
        setDatasNowPlay(results);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchUpcoming = async (code: string) => {
    await api
      .getAll(code)
      .then((response) => {
        const { results } = response.data;
        setDatasUpc(results);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchRandomHero = async (code: string) => {
    await api
      .getAll(code)
      .then((response) => {
        const { results } = response.data;
        setDatasTopRate(
          results[Math.floor(Math.random() * response.data.results.length)]
        );
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const handleNav = (movie_id?: number) => {
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  };

  const timeGreeting = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      setHandleTime('good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setHandleTime('good Aternoon');
    } else if (currentHour >= 17 && currentHour < 21) {
      setHandleTime('good Evening');
    } else {
      setHandleTime('good Night');
    }
  };

  function dedicatedMount() {
    setIsLoading(true);
    setTimeout(() => {
      fetchNowPlay('now_playing');
      fetchUpcoming('upcoming');
      fetchRandomHero('top_rated');
      timeGreeting();
    }, 1000);
    setIsLoading(false);
  }

  useEffect(() => {
    dedicatedMount();
  }, []);

  return (
    <Layout>
      <Section
        addClass="hero bg-base-100 -mt-0 md:-mt-12 xl:-mt-16 px-16 lg:px-24"
        id="greeting-section"
      >
        <div className="hero-content flex-col md:flex-row">
          {datasTopRate && isLoading === true ? (
            <HeroesCard
              key={`detail ${datasTopRate.id}`}
              button_label="Get Detail"
              item={datasTopRate}
              onClick={() => handleNav(datasTopRate.id)}
            />
          ) : (
            <div className=" h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-lg shadow-2xl flex justify-center items-center">
              <Spinner />
            </div>
          )}

          <div className="">
            <h1 className="text-5xl font-bold">Welcome!</h1>
            <p className="py-6">
              Hello, {handleTime} this is a web for learning and this section is
              greeting, yey!
              <br />
              and click button bellow to get random top rated movie
            </p>
            <button
              onClick={() => fetchRandomHero('top_rated')}
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
                    onClick={() => handleNav(item.id)}
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
                    onClick={() => handleNav(item.id)}
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
};

export default Home;
