import React from "react";

import PageHeader from "./PageHeader";
import FilterableDataList from "./FilterableDataList";
import Layout from "./Layout";
import { APP_NAME } from "./../constants/constants";
import { getUserPosts } from "../queries/post";
import { getUser } from "../queries/user";
import { getUserPlaces } from "./../queries/place";
import PostList from "./PostList";
export class UserWallPage extends React.Component {
  render() {
    const { posts, places } = this.props;
    const { userName, id } = this.props.user;
    const googleMapsProps = {
      isMarkerShown: true,
      places,
      showWholeWorld: true
    };
    const breadcrumbLinks = [
      { href: "/", text: "Home" },
      {
        href: `/user?uid=${id}`,
        as: `/u/show/${userName}/${id}`,
        text: userName,
        active: true
      }
    ];
    return (
      <Layout
        title={`${APP_NAME} | ${userName}`}
        description={`This page describe ${userName}'s profile`}
      >
        <div>
          <PageHeader title={userName} />
          <div className="content-container">
            <FilterableDataList
              DataList={PostList}
              data={posts}
              noDataText={`${userName} has not published any post yet.`}
              googleMapsProps={googleMapsProps}
              breadCrumbProps={{
                links: breadcrumbLinks
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

UserWallPage.getInitialProps = async function({ query }) {
  const { uid } = query;
  const posts = await getUserPosts(uid);
  const user = await getUser(uid);
  const places = await getUserPlaces(uid);
  return { posts, user, places };
};

export default UserWallPage;
