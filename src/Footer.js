import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Zaimportuj plik CSS, w którym zdefiniujemy styl Sticky Footer

const CookieFooter = () => {
    return (
        <div className="app-wrapper d-flex flex-column min-vh-100">
            <header>
                {/* Tu umieść kod dla nagłówka strony */}
            </header>
            <main className="flex-grow-1">
                {/* Tu umieść główną zawartość strony */}
            </main>
            <footer className="cookie-footer bg-dark text-light p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="mb-0 text-center">
                                Ta witryna korzysta z plików cookie, aby zapewnić Ci lepsze doświadczenie.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CookieFooter;

