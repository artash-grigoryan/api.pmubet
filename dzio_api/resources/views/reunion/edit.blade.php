@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Edit reunion</div>

                <div class="panel-body">
                    @if (session('msg'))
                        <div class="alert alert-success">
                            {{ session('msg') }}
                        </div>
                    @endif

                </div>
                <div class="panel-body">
                    <form action="{{ url('/admin/reunion/'.$reunion->id) }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="label">Label</label>
                            <input type="text" class="form-control" id="label" name="label" value="{{ $reunion->label or old('label')}}">
                        </div>
                        <div class="form-group">
                            <label for="statusLabel">Label</label>
                            <input type="text" class="form-control" id="statusLabel" name="statusLabel" value="{{ $reunion->statusLabel or old('statusLabel')}}">
                        </div>
                        <div class="form-group">
                            <label for="hippodromeName">Hippodrome Name</label>
                            <input type="text" class="form-control" id="hippodromeName" name="hippodromeName" value="{{ $reunion->hippodromeName or old('hippodromeName')}}">
                        </div>
                        <div class="form-group">
                            <label for="speciality">Speciality</label>
                            <input type="text" class="form-control" id="speciality" name="speciality" value="{{ $reunion->speciality}}">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
