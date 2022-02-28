import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { IMAGES, getImageById } from '../data/images';

function ModalImage() {
  let location = useLocation();
  let state = location.state;
  console.log('state', state, location);

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<ModalImageLayout />}>
          <Route index element={<ModalImageIndex />} />
          <Route path="gallery" element={<Gallery />}>
            <Route path="img/:id" element={<Modal />} />
          </Route>
          <Route path="imageView/:id" element={<ImageView />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function ModalImageLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="gallery">Gallery</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function ModalImageIndex() {
  return (
    <div>
      <h2>ModalImageIndex</h2>
      <h3>Featured Images</h3>
      <ul>
        <li>
          <Link to="imageView/1">Image 1</Link>
        </li>
        <li>
          <Link to="imageView/2">Image 2</Link>
        </li>
      </ul>
    </div>
  );
}

function Gallery() {
  let location = useLocation();
  console.log('location', location);

  return (
    <div style={{ padding: '0 24px' }}>
      <h2>Gallery</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}
      >
        {IMAGES.map((image) => (
          <Link
            key={image.id}
            to={`img/${image.id}`}
            // This is the trick! Set the `backgroundLocation` in location state
            // so that when we open the modal we still see the current page in
            // the background.
            state={{ backgroundLocation: location }}
          >
            <img
              width={200}
              height={200}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                height: 'auto',
                borderRadius: '8px',
              }}
              src={image.src}
              alt={image.title}
            />
          </Link>
        ))}
        <Outlet />
      </div>
    </div>
  );
}

function ImageView() {
  let { id } = useParams();
  let image = getImageById(Number(id));

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <img width={400} height={400} src={image.src} alt="" />
    </div>
  );
}

function Modal() {
  let navigate = useNavigate();
  let { id } = useParams();
  let image = getImageById(Number(id));
  let buttonRef = React.useRef();

  function onDismiss() {
    navigate(-1);
  }

  if (!image) return null;

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
    >
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          padding: '8px 8px',
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {image.title}
        </h1>
        <img
          style={{
            margin: '16px 0',
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
          }}
          width={400}
          height={400}
          src={image.src}
          alt=""
        />
        <button
          style={{ display: 'block' }}
          ref={buttonRef}
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="">Go to the home page</Link>
      </p>
    </div>
  );
}

export default ModalImage;
