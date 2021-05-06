import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
function EventPage() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <h1>Event Page</h1>
      <h3>{router.query.slug}</h3>
    </Layout>
  );
}

export default EventPage;
