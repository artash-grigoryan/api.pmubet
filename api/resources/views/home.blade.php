@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Reunions
                    <form style="float: right;" action="{{ url('/admin/reunions/?year='.$year.'&month='.$month.'&day='.$day) }}" method="get">
                        <div class="form-group">
                            <label for="lang">Date</label>
                            <select name="year">
                                @for ($i = 2019; $i <= date('Y'); ++ $i)
                                <option {{$i == $year ? 'selected' : ''}} value="{{$i}}">{{$i}}</option>
                                @endfor
                            </select>
                            /
                            <select name="month">
                                @for ($i = 1; $i <= 12; ++ $i)
                                <option {{$i == $month ? 'selected' : ''}} value="{{str_pad($i, 2, '0', STR_PAD_LEFT)}}">{{str_pad($i, 2, '0', STR_PAD_LEFT)}}</option>
                                @endfor
                            </select>
                            /
                            <select name="day">
                                @for ($i = 1; $i <= 31; ++ $i)
                                <option {{$i == $day ? 'selected' : ''}} value="{{str_pad($i, 2, '0', STR_PAD_LEFT)}}">{{str_pad($i, 2, '0', STR_PAD_LEFT)}}</option>
                                @endfor
                            </select>
                            <input type="submit" value="GO">
                        </div>
                    </form>
                </div>

                <div class="panel-body">
                    @if (session('msg'))
                    <div class="alert alert-success">
                        {{ session('msg') }}
                    </div>
                    @endif

                    <table class="table table-striped task-table">
                        <thead>
                        <th>number</th>
                        <th>label</th>
                        <th>hippodrome name</th>
                        <th>speciality</th>
                        <th>date</th>
                        <th>locale</th>
                        </thead>
                        <tbody>
                        @foreach ($reunions as $reunion)
                        <tr @if ($reunion->hasTranslation()) style="background-color: #1c7430; color: #FFF" @endif>
                            <td class="table-text"><div>R{{ $reunion->number }}</div></td>
                            <td class="table-text"><div>{{ $reunion->label }}</div></td>
                            <td class="table-text"><div>{{ $reunion->hippodromeName }}</div></td>
                            <td class="table-text"><div>{{ $reunion->speciality }}</div></td>
                            <td class="table-text"><div>{{ $reunion->date }}</div></td>
                            <td class="table-text"><div>{{ $reunion->translations }}</div></td>
                            <td>
                                <a href="{{ url('admin/reunion/'.$reunion->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                                <a style="margin: 3px 0;" target="_blank" href="{{ url('admin/racesList/?reunionId='.$reunion->id) }}" class="btn btn-primary">
                                    races
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <!--<td>
                                <form action="{{ url('/admin/reunion/'.$reunion->id) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}

                                    <button type="submit" class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i>
                                    </button>
                                </form>
                            </td>-->
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
