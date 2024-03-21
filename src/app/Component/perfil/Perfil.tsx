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
  if (!currentUser) {
    // Si userData no está definido, mostrar un mensaje de carga o error, o redirigir al usuario, según sea necesario
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Perfil"/>

      {/* Profile Header  */}
      {/* Pasar los datos del usuario al componente ProfileHeader */}
      <ProfileHeader 
        imageUrl={currentUser.imageUrl} 
        name={currentUser.name} 
        apellido={currentUser.apellido} 
        email={currentUser.email} 
      />

      {/* content */}
      <div className="py-6">
        <Row>
          {/* About Me */}
          <UserCard 
             id={currentUser.id} 
            numeroOperador={currentUser.numeroOperador} 
            dni={currentUser.dni} 
            matricula={currentUser.matricula} 
            phone={currentUser.phone} 
            phoneopc={currentUser.phoneopc} 
            role={currentUser.role} 
            address={currentUser.address} 
            especialidad={currentUser.especialidad} 
            especialidad2={currentUser.especialidad2}
            especialidad3={currentUser.especialidad3}
            dependencia={currentUser.dependencia} 
            tipo={currentUser.tipo} 
            descripcion={currentUser.descripcion} 
            checkedphone={currentUser.checkedphone}
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
