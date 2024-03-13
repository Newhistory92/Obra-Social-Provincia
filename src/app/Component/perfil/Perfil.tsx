
import { Col, Row, Container } from 'react-bootstrap';
import {useAppSelector,useAppDispatch} from "../../hooks/StoreHook"
import { setCurrentUser} from "../../reducers/userSlice"
// import widget as custom components
import  PageHeading  from '../../widgets/PageHeading'

// import sub components
import ProfileHeader from './ProfileHeader'



const Profile = () => {
  const { imageUrl, name, apellido, email } = useAppSelector(state => state.user.currentUser);
  console.log("Datos del usuario:", imageUrl, name, apellido, email);




  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Overview"/>

      {/* Profile Header  */}
      <ProfileHeader
        imageUrl={imageUrl}
        name={name}
        apellido={apellido}
        email={email}
      />

      {/* content */}
      <div className="py-6">
        <Row>

          {/* About Me */}
          {/* <AboutMe /> */}

          {/* Projects Contributions */}
          {/* <ProjectsContributions /> */}

          {/* Recent From Blog */}
          {/* <RecentFromBlog /> */}

          <Col xl={6} lg={12} md={12} xs={12} className="mb-6">

            {/* My Team */}
            {/* <MyTeam /> */}

            {/* Activity Feed */}
            {/* <ActivityFeed /> */}

          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default Profile