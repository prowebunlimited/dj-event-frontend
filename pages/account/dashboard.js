import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import DashboardEvent from '@/components/DashboardEvent';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
export default function DashboardPage({ events, token }) {
  // const deleteEvent = (id) => {
  //   console.log(id);
  // };
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm('Are you Sure')) {
      try {
        const res = await fetch(`${API_URL}/events/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          router.push('/events');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  // console.log(token);
  let events = [];
  try {
    const res = await fetch(`${API_URL}/events/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    events = await res.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      events,
      token,
    },
  };
};
