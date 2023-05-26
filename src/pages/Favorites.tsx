import { Component } from 'react';
import { Layout, Section } from '../components/Layout';
import { data } from '../json/dummy.json';
import { Card } from '../components/Card';
import { withRouter } from '../withRouter';

export class Favorites extends Component {
  render() {
    return (
      <Layout>
        <Section
          addClass="bg-base-100 px-16 lg:px-24 py-6 pt-16 "
          id="now-playing-section"
        >
          <div className="w-full min-h-screen flex flex-col items-center">
            <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
              My Favourite Movie
            </p>

            <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 ">
              {data.map((item, index) => {
                return (
                  <Card
                    key={index}
                    id={`movie-${item.title}`}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                );
              })}
            </div>
            <button className="btn btn-primary btn-wide">Show More</button>
          </div>
        </Section>
      </Layout>
    );
  }
}

export default withRouter(Favorites);
