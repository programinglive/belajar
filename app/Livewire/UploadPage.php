<?php

namespace App\Livewire;

use App\Models\ImageGallery;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;

class UploadPage extends Component
{
    use WithFileUploads;
 
    #[Rule('image|max:1024')] // 1MB Max
    public $photo;
 
    public function save()
    {
        $path = $this->photo->store('photos');

        ImageGallery::create([
            'image_path' => $path
        ]);

        $this->reset();

        $this->js('document.getElementById("uploadFile").reset()');
    }

    public function deleteImage(ImageGallery $photo)
    {
        $photo->delete();

        Storage::delete($photo->image_path);
    }

    public function render()
    {
        return view('livewire.upload-page', [
            'photos' => ImageGallery::all()
        ]);
    }
}
