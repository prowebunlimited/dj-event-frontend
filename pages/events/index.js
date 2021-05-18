import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} evt={event} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  let events = null;
  let total = 0;

  // Fetch Total Events
  try {
    const totalRes = await fetch(`${API_URL}/events/count`);
    total = await totalRes.json();
  } catch (err) {
    console.error(err);
  }

  // Fetch Events
  try {
    const eventRes = await fetch(
      `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
    );
    events = await eventRes.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: { events, page: +page, total },
  };
};
