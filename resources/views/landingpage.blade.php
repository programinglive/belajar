<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">
    <title>Programinglive | Open Source Project | Belajar Membuat Website</title>

    <!-- Bootstrap core CSS -->
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet">    
    <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/images/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
    <link rel="manifest" href="/images/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png">


    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
  </head>
  <body class="bg-dark">
    <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">Salah satu opsi website untuk beljar Web Development.</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Contact</h4>
              <ul class="list-unstyled">
                <li><a href="https://github.com/programinglive/belajar" class="text-white">Follow on Github</a></li>
                <li><a href="https://www.tiktok.com/@mahatma.mahardhika" class="text-white">Follow on Tittok</a></li>
                <li><a href="mailto:mahatma.mahardhika@programinglive.com" class="text-white">Email me</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a href="/" class="navbar-brand d-flex align-items-center gap-1">
            <img src="/images/logo_programinglive.jpg" alt="Logo Programinglive" class="rounded" style="max-height: 20px;">
            <strong>Programinglive | Belajar Membuat Website</strong>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>

    <main>

      <section class="py-3 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light text-light">Seri Belajar</h1>
            <p class="lead text-muted">
              Selamat datang di "Belajar Membuat Website: Panduan Lengkap untuk Pemula," sumber daya online yang lengkap untuk Anda yang ingin memahami dasar-dasar pembuatan website dan mengembangkan keterampilan Anda dalam dunia web development. Apakah Anda seorang pemula yang ingin memulai perjalanan Anda dalam dunia web development atau seorang profesional yang ingin meningkatkan kemampuan Anda, kami memiliki semua yang Anda butuhkan di sini.
            </p>
            <p>
              <a href="#" class="btn btn-primary my-2">Mulai</a>
            </p>
          </div>
        </div>
      </section>

      <div class="album">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <div class="card shadow-sm p-2 rounded">
                <img src="/crud_with_jquery.png" alt="" class="rounded" style="max-height: 170px;">

                <div class="card-body">
                  <p class="card-text" style="min-height: 30px; max-height: 150px;">Crud with jQuery Data table and Bootstrap Modal</p>
                  <div class="d-flex justify-content-end">
                    <div class="btn-group">
                      <a href="{{ route('crud.with.jquery') }}" class="btn btn-success">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm p-2 rounded">
                <img src="/livewire_sample.png" alt="" class="rounded" style="max-height: 170px;">

                <div class="card-body">
                  <p class="card-text" style="min-height: 30px; max-height: 150px;">Simple Counter App Using Livewire.</p>
                  <div class="d-flex justify-content-end">
                    <div class="btn-group">
                      <a href="{{ route('counter') }}" class="btn btn-success">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm p-2 rounded">
                <img src="/crud_livewire_plus_external_controller.png" alt="" class="rounded" style="max-height: 170px;">

                <div class="card-body">
                  <p class="card-text" style="min-height: 30px; max-height: 150px;">Livewire CRUD + External Default Laravel Controller.</p>
                  <div class="d-flex justify-content-end">
                    <div class="btn-group">
                      <a href="{{ route('userpages') }}" class="btn btn-success">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>

    <footer class="text-muted py-5">
      <div class="container">
        <p class="float-end mb-1">
          <a href="#">Back to top</a>
        </p>
      </div>
    </footer>
    <script src="/assets/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
