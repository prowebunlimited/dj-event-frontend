import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import styles from '@/styles/Event.module.css';
import { API_URL } from '@/config/index';
import EventMap from '@/components/EventMap';

function EventPage({ evt }) {
  //console.log(evt);
  const router = useRouter();
  const deleteEvent = async (e) => {
    if (confirm('Are you Sure')) {
      try {
        const res = await fetch(`${API_URL}/events/${evt.id}`, {
          method: 'DELETE',
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
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt />
              Edit event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers: </h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const {
    query: { slug },
  } = ctx;
  let events = null;
  try {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    events = await res.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: { evt: events[0] },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: {
//       slug: evt.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params: { slug } }) => {
//   let events = null;
//   try {
//     const res = await fetch(`${API_URL}/events?slug=${slug}`);
//     events = await res.json();
//   } catch (err) {
//     console.error(err);
//   }

//   return {
//     props: { evt: events[0] },
//     revalidate: 1,
//   };
// };

export default EventPage;
