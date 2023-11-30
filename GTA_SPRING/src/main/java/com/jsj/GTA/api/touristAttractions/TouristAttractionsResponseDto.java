package com.jsj.GTA.api.touristAttractions;

import com.jsj.GTA.util.Crawler;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.io.IOException;
import java.util.List;

@Schema(description = "이미지를 크롤링하는 관광지")
@Getter
public class TouristAttractionsResponseDto {
    @Schema(description = "관광지 id")
    private String id;
    @Schema(description = "관광지명")
    private String tourDestNm;
    @Schema(description = "관광지 구분")
    private String operationRuleNm;
    @Schema(description = "소재지 도로명주소")
    private String addrRoad;
    @Schema(description = "소재지 지번주소")
    private String addrJibun;
    @Schema(description = "위치 좌표 위도")
    private String lat;
    @Schema(description = "위치 좌표 경도")
    private String lng;
    @Schema(description = "면적 m^2")
    private String area;
    @Schema(description = "공공편익시설 정보")
    private String publicConvFcltInfo;
    @Schema(description = "관광지소개")
    private String tourDestIntro;
    @Schema(description = "관리기관전화번호")
    private String mngAgcTel;
    @Schema(description = "관리기관")
    private String mngAgcNm;
    @Schema(description = "이미지url 리스트")
    private List<String> images;

    public TouristAttractionsResponseDto(TouristAttractions entity) throws IOException {
        this.id = entity.getId();
        this.tourDestNm = entity.getTourDestNm();
        this.addrRoad = entity.getAddrRoad();
        this.addrJibun = entity.getAddrJibun();
        this.lat = entity.getLat();
        this.lng = entity.getLng();
        this.area = entity.getArea();
        this.publicConvFcltInfo = entity.getPublicConvFcltInfo();
        this.tourDestIntro = entity.getTourDestIntro();
        this.mngAgcTel = entity.getMngAgcTel();
        this.mngAgcNm = entity.getMngAgcNm();
        this.images = Crawler.getImages(entity.getTourDestNm());
    }
}
