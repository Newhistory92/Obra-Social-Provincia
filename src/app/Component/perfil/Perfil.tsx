import { Col, Row, Container } from 'react-bootstrap';
import { useAppSelector } from "../../hooks/StoreHook";
import PageHeading from '../../widgets/PageHeading';
import ProfileHeader from './ProfileHeader';
import  UserCard from "../cards/Card";

const Profile = () => {
  // Obtener los datos del usuario del estado global utilizando useAppSelector
  const currentUser = useAppSelector(state => state.user.currentUser);
console.log(currentUser )
  // Verificar si currentUser es null antes de acceder a sus propiedades

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Perfil"/>

      {/* Profile Header  */}
      {/* Pasar los datos del usuario al componente ProfileHeader */}
      <ProfileHeader 
        imageUrl={currentUser[0].imageUrl} 
        name={currentUser[0].name} 
        apellido={currentUser[0].apellido} 
        email={currentUser[0].email} 
      />

      {/* content */}
      <div className="py-6">
        <Row>
          {/* About Me */}
          <UserCard 
             id={currentUser[0].id} 
            numeroOperador={currentUser[0].numeroOperador} 
            dni={currentUser[0].dni} 
            matricula={currentUser[0].matricula} 
            phone={currentUser[0].phone} 
            phoneopc={currentUser[0].phoneopc} 
            role={currentUser[0].role} 
            addressId={currentUser[0].addressId} 
            especialidad={currentUser[0].especialidad} 
            especialidad2={currentUser[0].especialidad}
            especialidad3={currentUser[0].especialidad}
            dependencia={currentUser[0].dependencia} 
            tipo={currentUser[0].tipo} 
            descripcion={currentUser[0].descripcion} 
          />

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
  );
}

export default Profile;
