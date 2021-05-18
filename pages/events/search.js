import Layout from '@/components/Layout';
import Link from 'next/link';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import qs from 'qs';
import { useRouter } from 'next/router';
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title='Search Results'>
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} evt={event} />
      ))}
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { term } }) => {
  let events = null;
  try {
    const query = qs.stringify({
      _where: {
        _or: [
          { name_contains: term },
          { performers_contains: term },
          { description_contains: term },
          { venue_contains: term },
        ],
      },
    });
    const res = await fetch(`${API_URL}/events?${query}`);
    events = await res.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: { events },
  };
};
