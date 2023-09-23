<div>
  <!-- Modal -->
  <div wire:ignore.self class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" wire:model.live="name" id="name" class="form-control">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" wire:model.live="email" id="email" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" wire:click="{{ $actionButton }}">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

@push('scripts')
<script>
  document.addEventListener('livewire:initialized', () => {
    let exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
      keyboard: false,
      backdrop: 'static'
    })

    @this.on('hideUserForm', (event) => {
      exampleModal.hide();
    });

    @this.on('showUserForm', (event) => {
      @this.userId = event[0].id;
      @this.name = event[0].name;
      @this.email = event[0].email;
      exampleModal.toggle();
    });
  });

</script>
@endpush