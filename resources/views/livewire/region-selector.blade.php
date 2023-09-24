<div class="mt-5 container">
    <div class="from-group text-light">
        <label for="province">Provinsi</label>
        <select class="form-control" wire:model.live="provinceSelector">
            @foreach($provinces as $province)
            <option value="{{$province->id}}">{{$province->name}}</option>  
            @endforeach 
        </select>
    </div>
    <div class="from-group text-light">
        <label for="province">Kabupaten</label>
        <select class="form-control">
            @foreach($districts as $district)
            <option value="{{$district->id}}">{{$district->name}}</option>  
            @endforeach 
        </select>
    </div>
</div>
