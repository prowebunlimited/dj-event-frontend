import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} evt={event} />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  let events = null;
  try {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
    events = await res.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: { events },
    revalidate: 1,
  };
};
