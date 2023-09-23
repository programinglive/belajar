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
            <strong>ProgramingLive Series</strong>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <section class="py-3 text-center container">
        <div class="row py-3">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="text-light mb-4">Website Development</h1>
            <p class="text-muted fs-sm-1 mb-4">
              Selamat datang di <span class="fw-bold">"Website Development"</span> Panduan Lengkap untuk Pemula," sumber daya online yang lengkap untuk Anda yang ingin memahami dasar-dasar pembuatan website dan mengembangkan keterampilan Anda dalam dunia web development. Apakah Anda seorang pemula yang ingin memulai perjalanan Anda dalam dunia web development atau seorang profesional yang ingin meningkatkan kemampuan Anda, kami memiliki semua yang Anda butuhkan di sini.
            </p>
            <a href="https://github.com/programinglive/belajar" class="btn btn-primary btn-lg my-2 w-3" style="min-width: 260px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-light" style="max-height: 30px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Download Repository
            </a>
          </div>
        </div>
      </section>
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/crud_with_jquery.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 70px; max-height: 150px;">Crud with jQuery Data table and Bootstrap Modal</p>
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
                <p class="card-text" style="min-height: 70px; max-height: 150px;">Simple Counter App Using Livewire.</p>
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
                <p class="card-text" style="min-height: 70px; max-height: 150px;">Livewire CRUD + External Default Laravel Controller.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('userpages') }}" class="btn btn-success">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/upload_file_with_livewire.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 30px; max-height: 150px;">Upload file with Laravel Livewire.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('uploadpages') }}" class="btn btn-success">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/product_page_with_livewire.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 30px; max-height: 150px;">Add Product with Laravel Livewire.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('productPages') }}" class="btn btn-success">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/cart_page_with_livewire.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 30px; max-height: 150px;">Cart with Laravel Livewire.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('cartPages') }}" class="btn btn-success">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/sample_mail_with_laravel.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 30px; max-height: 150px;">Send Email with Laravel Livewire.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('sendmail') }}" class="btn btn-success" target="_blank">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm p-2 rounded">
              <img src="/crud_livewire_tiga_modal.png" alt="" class="rounded" style="max-height: 170px;">
              <div class="card-body">
                <p class="card-text" style="min-height: 30px; max-height: 150px;">CRUD Laravel Livewire 3 + Bootstrap Modal.</p>
                <div class="d-flex justify-content-end">
                  <div class="btn-group">
                    <a href="{{ route('modalLivewireTiga') }}" class="btn btn-success" target="_blank">View</a>
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
