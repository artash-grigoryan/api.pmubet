@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                </div>
                <div class="panel-body">
                    <table class="table table-striped task-table">
                        <thead>
                        <th>id</th>
                        <th>label</th>
                        <th>hippodrome name</th>
                        <th>speciality</th>
                        </thead>
                        <tbody>
                        @foreach ($reunions as $reunion)
                        <tr>
                            <td class="table-text"><div>{{ $reunion->id }}</div></td>
                            <td class="table-text"><div>{{ $reunion->label }}</div></td>
                            <td class="table-text"><div>{{ $reunion->hippodromeName }}</div></td>
                            <td class="table-text"><div>{{ $reunion->speciality }}</div></td>
                            <td>
                                <a href="{{ url('admin/reunion/'.$reunion->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <td>
                                <form action="{{ url('/admin/reunion/'.$reunion->id) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}

                                    <button type="submit" class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <?php echo $reunions->render(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
