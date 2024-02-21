
<template>
  <section class="sub-contents">
      <ul class="menutree">
        <li id="li_system"></li>
        <li> > </li>
        <li id="li_user"></li>
        <li> > </li>
        <li id="li_userManagement"></li>
      </ul>
      <h4 class="flex-al" id="title_userManageMent"><img src="/images/ots-system.svg" class="mr10" alt="system icon"></h4>
      <div class="srch_filterbox">
        <div class="filterbox-01">
          <div class="formset">
            <fieldset class="form">
              <label for="userStatus">
                <select v-model="userStatus" id="userStatus">
                  <option value="">Status</option>
                  <option value="deactivated">Deactivated</option>
                  <option value="e1">Initially registered(E1)</option>
                  <option value="s1">Temprorary PW sent(S1)</option>
                  <option value="s2">User data registered(S2)</option>
                  <option value="s3">Approval requested(S3)</option>
                  <option value="s4">Registration denied(S4)</option>
                  <option value="s5">ID Creation approved(S5)</option>
                  <option value="s6">ID created(S6)</option>
                  <option value="d1">Deletion requested(D1)</option>
                  <option value="d2">Approval requested(D2)</option>
                  <option value="d3">Deletion denied(D3)</option>
                  <option value="d4">ID Deletion approved(D4)</option>
                  <option value="d5">ID Deleted(D5)</option>
                  <option value="l1">Password Error(L1)</option>
                  <option value="l2">Forgot Password(L2)</option>
                  <option value="l3">Reset Password(L3)</option>
                </select>
              </label>
              <label for="corpCode">
                <select name="corpCode" id="corpCode" v-model="corpCode">
                  <option value="100">GEU</option>
                  <option value="200">GAL</option>
                  <option value="eu">External User</option>
                  <option value="tu">Test User </option>
                </select>
              </label>
              <label for="searchCase">
                <select v-model="searchCase" id="keyword">
                  <option value="0">Keyword</option>
                  <option value="1">Id</option>
                  <option value="2">Name</option>
                  <option value="3">Email</option>
                  <option value="4">Phone</option>
                  <option value="5">Mobile</option>
                </select>
              </label>
              <div class="srchform">
                <input type="text" v-model="keyword" @keyup.enter="search" placeholder="Enter search term" onfocus="this.placeholder=''" onblur="this.placeholder='Enter search term'">
              </div>
            </fieldset>
          </div>
          <div class="filterbtn-01">
            <button class="btn-search" @click="search" id="btn-search" >SEARCH</button>
          </div>
        </div>
      </div>
      <div class="l-utils">
        <div class="l-showhow">
          <span id="etc_show"></span>
          <select id="updatePageSize">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="l-btnwrap">
          <a id="btn-new" class="btn-effect" @click="addPage">NEW<img src="/images/ic_btn-new.svg" class="plus-icon" alt="plus icon"></a>
          <!-- <button id="btn-order">ORDER</button> -->
          <button id="btn-excel"><img src="/images/img_excel.png" alt="excel">EXCEL</button>
        </div>
      </div>
      <div class="result_area">
        <div id="grid"></div>
      </div>
    <div class="pageDiv">
        <span v-if="totalRow > -1">Total <strong>{{ totalRow }}</strong></span>
        <span class="txtcol6">|</span>
        <span v-if="currentPage > 0">Page <strong>{{ currentPage }}</strong></span>
      </div>
    </section>

  <!-- 햄버거 메뉴 -->
  <MobileMenu></MobileMenu>

</template>

<script>
import Grid from 'tui-grid';
import 'tui-grid/dist/tui-grid.css'
import 'tui-pagination/dist/tui-pagination.css'
import "tui-date-picker/dist/tui-date-picker.css";
import router from "@/router";
import axios from '../../../utils/interceptors';
import moment from "moment";
import 'moment-timezone';
import MobileMenu from "@/layout/MobileMenu.vue";

import { loadElementTexts,loadText } from '@/utils/multilingual';

export default {
  components :{
    MobileMenu:MobileMenu,
  },
  data(){
    return{
      gridInstance: null,
      userStatus: '',
      corpCode: '100',
      keyword: '',
      searchCase: '0',
      currentPage:1,
      totalRow:0,
      dataSource:[],
    }

  },

  computed: {
    formattedDataSource() {
      return this.dataSource.map((row) => {
        const formattedDate = moment(row.loginDate, "YYYY-MM-DD HH:mm:ss.S Z").format("MM-DD-YYYY HH:mm:ss");
        return {
          ...row,
          loginDate: formattedDate,
        };
      });
    },
  },

 async mounted() {

    //title변경할때 사용
  // const menuList = localStorage.getItem('menuList');
  // const itemWithMenuSeqZero = menuList.find(item => item.menuSeq === 0);


  const corpCode = localStorage.getItem('corpCode');
  const langCode = localStorage.getItem('langCode');
  try {

   const response = await axios.post('/api/system/user/userMgmt/getUserList', {
     corpCode: corpCode,
     langCode:langCode
   })
   //const response = await axios.post('/system/user/userMgmt/getUserList?corpCode=' + corpCode+'&langCode='+langCode);
   this.dataSource = response.data.data;

  } catch(error){
    const errorMessage = loadText('alert-error');
    //alert(errorMessage)
  }

    const columns = Object.keys(this.dataSource[0]).map(columnName => {
      const columnOptions = {
        header: this.getColumnTitle(columnName),
        name: columnName,
        align: 'center',
        sortable: true,
        filter: 'select',
        // hidden:hiddenColumns.includes(columnName)
      };

      return columnOptions;
    });

   const rearrangedColumns = [
     columns.find(column => column.name === 'userId'),
     columns.find(column => column.name === 'corpCode'),
     columns.find(column => column.name === 'userStatus'),
     columns.find(column => column.name === 'firstName'),
     columns.find(column => column.name === 'lastName'),
     columns.find(column => column.name === 'email'),
     columns.find(column => column.name === 'companyPhone'),
     columns.find(column => column.name === 'privatePhone'),
     columns.find(column => column.name === 'loginDate'),

   ];

    this.gridInstance = new Grid({
      el: document.getElementById('grid'), // Container element
      //data:this.dataSource,
      data: this.formattedDataSource,
      scrollX:false,
      scrollY:false,
      bodyHeight: 'auto',
      header: {
        height: 'auto'
      },
      rowHeight: 62,
      // summary: {height: 'auto'},
      //rowHeaders:['checkbox'],
      pageOptions:{
        perPage :10,
        useClient:true
      },
      columns:rearrangedColumns
    });

   this.gridInstance.getData();

   Grid.applyTheme('clean',{
     selection: {
       background: '#4daaf9',
       border: 'none'
     },
     scrollbar: {
       background: '#f4f4f4',
       thumb: '#ddd',
       /*active: 'none'*/
     },
     row: {
       odd: {
         background: '#fff'
       },
       even: {
         background: '#f5f8fd'
       },
       hover: {
         // background: '#edf3ff'
       }
     },
     cell: {
       normal: {
         background: '#fbfbfb',
         border: 'none',
         showVerticalBorder: false,
       },
       header: {
         background: '#eee',
         showVerticalBorder: false,
       },
       rowHeader: {
         showVerticalBorder: false
       },
       editable: {
         background: '#fbfbfb'
       },
       selectedHeader: {
         background: '#d8d8d8'
       },
       selected: {
         border: 'none',
         background: '#edf3ff'
       },
       focused: {
         border: 'none'
       },
       disabled: {
         text: '#b0b0b0',
       }
     }
   });

    //칸 선택 시
   this.gridInstance.on('focusChange', (focusChangeEvent) => {
      const columnName = focusChangeEvent.columnName;
      const key = focusChangeEvent.rowKey;

      const dataRow = this.gridInstance.getRow(key);

      if(columnName === "userId"){

        router.push(
            {
              name: 'userManagementUpdateVue',
              query: {dataObj: JSON.stringify(dataRow)}
            }
        );
      }

    })

    // 엑셀다운로드 옵션
    const downloadOptions = {
      includeHiddenColumns: true,
      onlySelected: true,
      fileName: 'UserManagementData',
    };
    const excelDownloadButton = document.getElementById('btn-excel');
    // XLSX로 내보내기를 위한 이벤트 핸들러
    const vm = this;
    excelDownloadButton.addEventListener('click', function () {
      const downloadConfirm = loadText('alert-downloadConfirm');
      const downloadConfirmed = window.confirm(downloadConfirm);

      if (downloadConfirmed) {
        vm.gridInstance.export('xlsx', downloadOptions);
      }
    });

    //페이지 사이즈 설정
    const selectPerPage = document.getElementById('updatePageSize');
    selectPerPage.addEventListener('change',function (){
      const selectedValue = selectPerPage.value;
      //console.log("selectedValue",selectedValue);
      //const a = vm.gridInstance.getData();
      console.log("sssss",a)
      //this.gridInstance.setPerPage(selectedValue,vm.gridInstance.getData());

    })

    //페이징 정보
    const totalCount = this.gridInstance.getRowCount();
    //const totalCount = instance.getPaginationTotalCount();
    this.totalRow = totalCount;
    this.gridInstance.on("afterPageMove", (eventData) => {
      this.currentPage = eventData.page;
    })

   const elementsWithId = document.querySelectorAll('[id]');
   const ids = Array.from(elementsWithId).map(element => element.id);
   const buttonNames = loadElementTexts(ids);
  },
  methods:{
    getColumnTitle(columnName) {
      // Define custom titles for each column name
      const userId = loadText('grid-userId');
      const corpCode = loadText('grid-corpCode');
      const status = loadText('grid-status');
      const firstName = loadText('grid-firstName');
      const lastName = loadText('grid-lastName');
      const email = loadText('grid-email');
      const phone = loadText('grid-phone');
      const mobile = loadText('grid-mobile');
      const lastLoginDate = loadText('grid-lastLoginDate');

      const titleMap = {
        userId: userId,
        corpCode: corpCode,
        userStatus: status,
        firstName: firstName,
        lastName: lastName,
        email: email,
        companyPhone: phone,
        privatePhone: mobile,
        loginDate: lastLoginDate,
      };

      return titleMap[columnName] || columnName;
    },
    async search() {
      const langCode = localStorage.getItem('langCode');

      // axios.post('/system/user/userMgmt/getUserList?corpCode='+this.corpCode+
      // '&langCode='+langCode+'&keyword='+this.keyword,{
      // })

      await axios.post('/api/system/user/userMgmt/getUserList',{
        corpCode : this.corpCode,
        langCode : langCode,
        userStatus : this.userStatus,
        searchCase : this.searchCase,
        keyword: this.keyword
      })
      .then((response) => {
        const responseData = response.data.data;

        responseData.map((row) => {
          const formattedDate = moment(row.loginDate, "YYYY-MM-DD HH:mm:ss.S Z").format("MM-DD-YYYY HH:mm:ss");
          return {
            ...row,
            loginDate: formattedDate,
          };
        });

        this.gridInstance.resetData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    },
    addPage() {
      router.push(
          {
            name: 'userManagementAddVue'
          }
      );
    },
  }
}
</script>

<style scoped>
.condition-dropdowns {
  margin:20px;
  display: flex;
}

.condition-dropdowns select {
  margin-right: 10px;
}

.function-box {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.function-box input {
  padding: 5px;
  margin-right: 5px;
}

.function-box button {
  background-color: #3498db;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin:10px;

}

.button-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.button-box button {
  background-color: #3498db;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin:10px;
}

.optionBox{
  display: flex;
  justify-content: space-between;
}

</style>
