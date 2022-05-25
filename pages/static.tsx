import { GetStaticProps } from 'next';

type SingleUser = {
  id: number;
  name: string;
}

type PageProps = {
  users: Array<SingleUser>;
}

const Page = (props: PageProps) => {
  const {
    users,
  } = props;

  const filteredUsers = users.filter(({ id }) => id !== 2);

  return (
    <>
      <p>
        This is a static page
      </p>

      <p>
        Users count:

        <b>
          { filteredUsers.length }
        </b>
      </p>
    </>
  );
};

// Runs in build time so we don't have any context of app
// Requests should be user agnostic and page is cache friendly
export const getStaticProps: GetStaticProps = async () => {
  const users: Array<SingleUser> = [
    {
      id: 1,
      name: 'test',
    },
    {
      id: 2,
      name: 'test2',
    },
    {
      id: 3,
      name: 'test3',
    },
  ];

  if (users.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users,
    },
  };
};

export default Page;
